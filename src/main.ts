import '@/styles/main.scss'
import { configureScene } from './threejs/sceneGenerator'
import { isClient } from './utils/browser'


if (isClient) {
  const canvas = document.getElementById('three-scene')

  if (canvas) {
    configureScene(canvas)
  }
}
