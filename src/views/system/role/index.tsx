import { AnimatedRoute } from '@/components/Motion'
import AddButton from '@/views/system/role/AddButton'

export default function Role() {
  return (
    <AnimatedRoute>
      <div className="bg-white dark:bg-dark-bg p-2">
        <div className="mb-2">
          <AddButton />
        </div>
      </div>
    </AnimatedRoute>
  )
}
