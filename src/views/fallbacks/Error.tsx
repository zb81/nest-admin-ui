import CheckLoggedIn from '@/components/CheckLoggedIn'

export default function Error() {
  return (
    <CheckLoggedIn>
      <div>Error occurred. 😭</div>
    </CheckLoggedIn>
  )
}
