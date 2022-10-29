import { Clock } from "three"
import { isClient } from '@/utils/browser'

export const tick = (fn: Function) => {
  let animationFrameId: number | null = null

  if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
  const clock = new Clock()

  const rendererFn = () => {

    const elapsedTime = clock.getElapsedTime()

    fn(elapsedTime)
    if (isClient) {
      animationFrameId = window.requestAnimationFrame(rendererFn)
    }
  }
  rendererFn()
}

export const sizes = {
 width: isClient ? window.innerWidth : 1920,
 height: isClient ? window.innerHeight : 1080
}