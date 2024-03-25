import { AppstoreOutlined } from '@ant-design/icons'
import { Empty, Input, Pagination, Popover } from 'antd'
import classNames from 'classnames'
import { debounce } from 'lodash-es'

import { antdIcons, renderAntdIcon } from '@/utils/ant-design-icons'

interface IconPickerProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const PAGE_SIZE = 35

export default function IconPicker({ value, onChange, placeholder }: IconPickerProps) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(1)
  const [keyword, setKeyword] = useState('')

  const debouncedSearch = debounce((keyword: string) => {
    setKeyword(keyword.trim())
    setCurrent(1)
  }, 300)

  const allIcons = keyword
    ? antdIcons.filter(icon => icon.includes(keyword.toLowerCase()))
    : antdIcons

  const iconsToShow = allIcons.slice(PAGE_SIZE * (current - 1), PAGE_SIZE * current)

  const content = (
    <div className="w-[270px]">
      <Input.Search
        className="mb-3"
        allowClear
        placeholder="搜索图标"
        onChange={e => debouncedSearch(e.target.value)}
      />
      {iconsToShow.length > 0
        ? (
          <ul className="flex flex-wrap gap-1">
            {iconsToShow.map((icon) => {
              const className = classNames(
                'rounded-1 text-[20px] p-1 w-[35px] h-[35px] flex-row-center cursor-pointer',
                {
                  'bg-primary text-white': icon === value,
                },
              )
              return (
                <li
                  key={icon}
                  className={className}
                  onClick={() => onChange?.(icon)}
                >
                  {renderAntdIcon(icon)}
                </li>
              )
            })}
          </ul>
          )
        : <Empty description="暂无数据" />}
      <Pagination
        size="small"
        className="text-right mt-3"
        total={allIcons.length}
        current={current}
        pageSize={PAGE_SIZE}
        showSizeChanger={false}
        showLessItems
        onChange={setCurrent}
      />
    </div>
  )

  const after = (
    <Popover
      open={open}
      trigger="click"
      placement="bottomLeft"
      content={content}
      onOpenChange={setOpen}
    >
      <div className="text-black dark:text-white cursor-pointer">
        {value ? renderAntdIcon(value) : <AppstoreOutlined />}
      </div>
    </Popover>
  )

  return (
    <Input
      className="input-trigger"
      value={value}
      readOnly
      placeholder={placeholder}
      addonAfter={after}
      onClick={() => setOpen(true)}
    />
  )
}
