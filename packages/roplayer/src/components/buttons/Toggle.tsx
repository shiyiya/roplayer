import React from 'react'
import { usePlayerStore } from '../../atoms/player'
import { Button } from '../ui/Button'

export const Toggle = ({ children, val, onClick }: any) => {
  return <Button onClick={onClick}>{val ? children[0] : children[1]}</Button>
}
