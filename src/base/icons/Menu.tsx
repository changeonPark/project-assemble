import { cls } from "@base/utils"

interface Props {
  size?: string
  color?: string
}

const Menu = ({ size, color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cls(
        size ? `${size}` : "h-6 w-6",
        color ? `text-[${color}]` : ""
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}

export default Menu
