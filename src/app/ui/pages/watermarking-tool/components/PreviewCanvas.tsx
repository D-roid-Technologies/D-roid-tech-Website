"use client"

// Preview canvas component
import { forwardRef } from "react"
import { ImageIcon, Download, RotateCcw, Grid } from "lucide-react"
import type { ExportFormat } from "../types"
import { EXPORT_FORMATS } from "../lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import Button from "./ui/Button"
import Label from "./ui/Label"

interface PreviewCanvasProps {
  hasImage: boolean
  onDownload: () => void
  onReset: () => void
  exportFormat: ExportFormat
  onExportFormatChange: (format: ExportFormat) => void
  isProcessing?: boolean
  showGrid?: boolean
  onToggleGrid?: () => void
  className?: string
}

const PreviewCanvas = forwardRef<HTMLCanvasElement, PreviewCanvasProps>(
  (
    {
      hasImage,
      onDownload,
      onReset,
      exportFormat,
      onExportFormatChange,
      isProcessing = false,
      showGrid = false,
      onToggleGrid,
      className = "",
    },
    ref,
  ) => {
    return (
      <Card className={`wt-preview-canvas ${className}`}>
        <CardHeader>
          <CardTitle>
            Preview
            {showGrid && <span className="wt-badge wt-badge--secondary">Grid</span>}
          </CardTitle>
          <div className="wt-preview-controls">
            {onToggleGrid && (
              <Button variant="outline" size="sm" onClick={onToggleGrid} title="Toggle grid">
                <Grid size={16} />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="wt-canvas-container">
            {hasImage ? (
              <canvas ref={ref} className="wt-canvas" />
            ) : (
              <div className="wt-empty-state">
                <ImageIcon className="wt-empty-state__icon" />
                <h3 className="wt-empty-state__title">No Image Selected</h3>
                <p className="wt-empty-state__description">Upload an image to start adding watermarks</p>
              </div>
            )}
          </div>

          {hasImage && (
            <div className="wt-export-controls">
              <div className="wt-form-group">
                <Label htmlFor="export-format">Export Format</Label>
                <Select value={exportFormat} onValueChange={(value) => onExportFormatChange(value as ExportFormat)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPORT_FORMATS.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="wt-action-buttons">
                <Button  onClick={onDownload} disabled={!hasImage || isProcessing} loading={isProcessing} fullWidth>
                  {/* <Download size={16} /> */}
                  <span className="wt-action-buttons-downloadBtn">Download </span>
                </Button>
                <Button variant="outline" onClick={onReset} disabled={isProcessing} size="icon" title="Reset all">
                  <RotateCcw size={16} />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  },
)

PreviewCanvas.displayName = "PreviewCanvas"

export default PreviewCanvas
