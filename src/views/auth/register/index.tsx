import { Button, Col, Form, Input, Row, Space, message } from 'antd'
import { motion } from 'framer-motion'

import { checkUsername, register, sendRegisterEmailCode } from '@/apis/auth'
import { VariantsContainer, VariantsItemRight } from '@/components/Motion'
import { itemRightVariants } from '@/constants/variants'
import { useEmailCountdown } from '@/hooks/useEmailCountdown'

interface IFormData {
  username: string
  email: string
  code: string
  password: string
  confirmPassword: string
}

async function validateUsername(_: any, value: string) {
  if (!value)
    return Promise.reject(new Error('请输入用户名'))

  if (!(/^[a-zA-Z0-9_]{4,12}$/.test(value)))
    return Promise.reject(new Error('用户名为 4-12 位字母、数字或下划线'))

  const [valid] = await checkUsername(value)

  if (valid === false)
    return Promise.reject(new Error('用户名已存在'))

  return Promise.resolve()
}

export default function Register() {
  const [form] = Form.useForm<IFormData>()
  const navigate = useNavigate()

  const { seconds, disabled, start } = useEmailCountdown()

  const { loading: sendLoading, run: send } = useRequest(sendRegisterEmailCode, {
    manual: true,
    onSuccess: ([_, err]) => {
      if (!err) {
        start()
        message.success('验证码已发送')
      }
    },
  })

  const { loading, run } = useRequest(register, {
    manual: true,
    onSuccess: ([_, err]) => {
      if (!err) {
        message.success('注册成功')
        navigate('/auth/login', { replace: true })
      }
    },
  })

  function sendCaptcha() {
    form.validateFields(['email']).then(() => {
      send({ email: form.getFieldValue('email') })
    })
  }

  function submit() {
    run({
      email: form.getFieldValue('email'),
      username: form.getFieldValue('username'),
      password: form.getFieldValue('password'),
      code: form.getFieldValue('code'),
    })
  }

  return (
    <VariantsContainer className="w-[400px] -mt-10">
      <motion.h2
        className="font-bold text-2xl text-center mb-6"
        variants={itemRightVariants}
      >
        注册
      </motion.h2>
      <Form form={form} onFinish={submit}>
        <VariantsItemRight>
          <Form.Item<IFormData>
            name="username"
            hasFeedback
            validateDebounce={500}
            rules={[{ validator: validateUsername }]}
          >
            <Input size="large" placeholder="输入用户名" />
          </Form.Item>
        </VariantsItemRight>
        <VariantsItemRight>
          <Form.Item<IFormData>
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱' },
            ]}
          >
            <Input size="large" placeholder="输入邮箱" />
          </Form.Item>
        </VariantsItemRight>
        <VariantsItemRight>
          <Form.Item<IFormData>
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Space.Compact className="w-full">
              <Input size="large" placeholder="输入验证码" />
              <Button
                disabled={disabled}
                size="large"
                type="primary"
                loading={sendLoading}
                onClick={sendCaptcha}
              >
                {disabled ? `${seconds} 秒` : '发送验证码'}
              </Button>
            </Space.Compact>
          </Form.Item>
        </VariantsItemRight>
        <VariantsItemRight>
          <Form.Item<IFormData>
            name="password"
            hasFeedback
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, max: 18, message: '密码长度为 6-18 位' },
              { pattern: /^\S*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@\.#$%^&*?])\S*$/, message: '密码必须同时包含字母、数字、特殊字符' },
            ]}
          >
            <Input.Password size="large" placeholder="输入密码" />
          </Form.Item>
        </VariantsItemRight>
        <VariantsItemRight>
          <Form.Item<IFormData>
            name="confirmPassword"
            hasFeedback
            rules={[
              {
                validator(_, value) {
                  if (!value)
                    return Promise.reject(new Error('请输入确认密码'))

                  if (value !== form.getFieldValue('password'))
                    return Promise.reject(new Error('两次密码输入不一致'))
                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input.Password size="large" placeholder="再次输入密码" />
          </Form.Item>
        </VariantsItemRight>
        <VariantsItemRight>
          <Row>
            <Col span={12}>
              <Form.Item className="text-left">
                <Button type="link" className="p-0">
                  <Link to="/auth/login" replace>返回登录</Link>
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
            提交
          </Button>
        </VariantsItemRight>
      </Form>
    </VariantsContainer>
  )
}
