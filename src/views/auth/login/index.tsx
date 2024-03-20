import { useMount, useRequest } from 'ahooks'
import { Button, Col, Form, Input, Row, Space, message } from 'antd'
import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getAccountMenus } from '@/apis/account'
import type { CaptchaImgVo, LoginDto } from '@/apis/auth'
import { getCaptchaImg, login } from '@/apis/auth'
import { VariantsContainer, VariantsItemRight } from '@/components/Motion'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/storage-keys'
import { itemRightVariants } from '@/constants/variants'
import { MenusContext } from '@/contexts/MenusContext'
import { setDynamicRoutes } from '@/router'
import { localCache } from '@/utils/cache'

export default function Login() {
  const [form] = Form.useForm<LoginDto>()
  const [captcha, setCaptcha] = useState<CaptchaImgVo>()

  async function getCaptcha() {
    form.resetFields(['code'])
    const [res] = await getCaptchaImg()
    if (res)
      setCaptcha(res)
  }

  const navigate = useNavigate()
  const { setMenus } = useContext(MenusContext)

  const { loading, run } = useRequest(login, {
    manual: true,
    onSuccess: async ([res, err]) => {
      if (!err) {
        localCache.set(ACCESS_TOKEN_KEY, res.accessToken)
        localCache.set(REFRESH_TOKEN_KEY, res.refreshToken)

        // 请求菜单
        const [menus, err] = await getAccountMenus()
        if (!err) {
          setDynamicRoutes(menus)
          setMenus(menus)
        }

        message.success('登录成功')
        navigate('/', { replace: true })
      }
      else {
        getCaptcha()
      }
    },
  })

  function submit() {
    run({
      ...form.getFieldsValue(),
      key: captcha!.id,
    })
  }

  useMount(() => getCaptcha())

  return (
    <VariantsContainer className="w-[400px] -mt-10">
      <motion.h2 className="font-bold text-2xl text-center mb-6" variants={itemRightVariants}>登 录</motion.h2>
      <Form form={form} onFinish={submit}>
        <VariantsItemRight>
          <Form.Item<LoginDto> name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input size="large" placeholder="用户名" />
          </Form.Item>
        </VariantsItemRight>
        <VariantsItemRight>
          <Form.Item<LoginDto> name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password size="large" placeholder="密码" />
          </Form.Item>
        </VariantsItemRight>
        <VariantsItemRight>
          <Form.Item<LoginDto> name="code" rules={[{ required: true, message: '请输入验证码' }]}>
            <Space.Compact className="w-full">
              <Input size="large" placeholder="验证码" />
              {captcha ? <img className="h-[40px] cursor-pointer" src={captcha.img} onClick={getCaptcha} /> : null}
            </Space.Compact>
          </Form.Item>
        </VariantsItemRight>
        <VariantsItemRight>
          <Row>
            <Col span={12}>
              <Form.Item className="text-left">
                <Button type="link" className="p-0">
                  <Link to="/auth/register">注册</Link>
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item className="text-right">
                <Button type="link" className="p-0">
                  <Link to="/auth/forget">忘记密码</Link>
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </VariantsItemRight>
        <VariantsItemRight>
          <Button
            className="w-full"
            size="large"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            登录
          </Button>
        </VariantsItemRight>
      </Form>
    </VariantsContainer>
  )
}
