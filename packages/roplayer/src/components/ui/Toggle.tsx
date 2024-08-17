import { Button } from './Button'

export const Toggle = ({ children, val, onClick }: any) => {
  return <Button onClick={onClick}>{val ? children[0] : children[1]}</Button>
}
