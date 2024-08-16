export function Button(props: any) {
  const { children, ...rest } = props
  return (
    <button
      type="button"
      // active:scale-110 active:bg-opacity-75 active:text-white
      className="active:scale-110 active:bg-opacity-75 active:text-white tabbable p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-50 transition-transform duration-100 flex items-center gap-3 active:scale-110 active:bg-opacity-75 active:text-white"
      {...rest}
    >
      <span className="text-2xl">{children}</span>
    </button>
  )
}
