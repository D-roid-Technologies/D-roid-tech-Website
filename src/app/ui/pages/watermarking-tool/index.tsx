// Main export file - this is what your main app will import
import './styles/index.css'
export { default as WatermarkingTool } from "./components/WatermarkingTool"
export type {
  WatermarkingToolProps,
  WatermarkSettings,
  WatermarkPosition,
  WatermarkType,
  ExportFormat,
} from "./types"
