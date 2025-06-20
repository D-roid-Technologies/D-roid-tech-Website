"use client"

// Watermark controls component
import type React from "react"
import { Palette, Type, RotateCw, Droplets } from "lucide-react"
import type { WatermarkSettings, WatermarkType, WatermarkPosition } from "../types"
import { WATERMARK_PRESETS, applyPreset } from "../lib/presets"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import Button from "./ui/Button"
import Input from "./ui/Input"
import Label from "./ui/Label"
import Slider from "./ui/Slider"

interface WatermarkControlsProps {
  settings: WatermarkSettings
  onSettingsChange: (settings: WatermarkSettings) => void
  onImageUpload: (file: File) => Promise<void>
  watermarkImage?: HTMLImageElement | null
  className?: string
}

const WatermarkControls: React.FC<WatermarkControlsProps> = ({
  settings,
  onSettingsChange,
  onImageUpload,
  watermarkImage,
  className = "",
}) => {
  const updateSettings = (updates: Partial<WatermarkSettings>) => {
    onSettingsChange({ ...settings, ...updates })
  }

  const handlePresetApply = (presetName: string) => {
    const preset = WATERMARK_PRESETS.find((p) => p.name === presetName)
    if (preset) {
      const newSettings = applyPreset(settings, preset)
      onSettingsChange(newSettings)
    }
  }

  return (
    <Card className={`wt-watermark-controls ${className}`}>
      <CardHeader>
        <CardTitle>
          <Palette size={20} />
          Watermark Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Watermark Type Tabs */}
        <Tabs value={settings.type} onValueChange={(value) => updateSettings({ type: value as WatermarkType })}>
          <TabsList>
            <TabsTrigger value="image">
              <Palette size={16} />
              Image
            </TabsTrigger>
            <TabsTrigger value="text">
              <Type size={16} />
              Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image">
            <div className="wt-form-group">
              <Label>Watermark Image</Label>
              <div className="wt-image-upload-mini">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) onImageUpload(file)
                  }}
                  className="wt-input"
                />
                {watermarkImage && (
                  <div className="wt-image-preview-mini">
                    <img src={watermarkImage.src || "/placeholder.svg"} alt="Watermark" />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="text">
            <div className="wt-form-group">
              <Label htmlFor="watermark-text">Watermark Text</Label>
              <Input
                id="watermark-text"
                value={settings.text}
                onChange={(e) => updateSettings({ text: e.target.value })}
                placeholder="Enter watermark text"
              />
            </div>

            <div className="wt-form-group">
              <Label htmlFor="font-size">Font Size: {settings.fontSize}%</Label>
              <Slider
                id="font-size"
                min={10}
                max={200}
                step={5}
                value={[settings.fontSize]}
                onValueChange={(value) => updateSettings({ fontSize: value[0] })}
              />
            </div>

            <div className="wt-form-group">
              <Label htmlFor="text-color">Text Color</Label>
              <Input
                id="text-color"
                type="color"
                value={settings.color}
                onChange={(e) => updateSettings({ color: e.target.value })}
              />
            </div>

            <div className="wt-form-group">
              <div className="wt-checkbox-group">
                <input
                  type="checkbox"
                  id="text-shadow"
                  checked={settings.shadow}
                  onChange={(e) => updateSettings({ shadow: e.target.checked })}
                  className="wt-checkbox"
                />
                <Label htmlFor="text-shadow">Add shadow effect</Label>
              </div>
            </div>

            {settings.shadow && (
              <>
                <div className="wt-form-group">
                  <Label htmlFor="shadow-color">Shadow Color</Label>
                  <Input
                    id="shadow-color"
                    type="color"
                    value={settings.shadowColor}
                    onChange={(e) => updateSettings({ shadowColor: e.target.value })}
                  />
                </div>

                <div className="wt-form-group">
                  <Label htmlFor="shadow-blur">Shadow Blur: {settings.shadowBlur}px</Label>
                  <Slider
                    id="shadow-blur"
                    min={0}
                    max={20}
                    step={1}
                    value={[settings.shadowBlur]}
                    onValueChange={(value) => updateSettings({ shadowBlur: value[0] })}
                  />
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Position Settings */}
        <div className="wt-form-group">
          <Label htmlFor="position">Position</Label>
          <Select
            value={settings.position}
            onValueChange={(value) => updateSettings({ position: value as WatermarkPosition })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top-left">Top Left</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Size Control */}
        <div className="wt-form-group">
          <Label htmlFor="size">Size: {settings.size}%</Label>
          <Slider
            id="size"
            min={5}
            max={50}
            step={1}
            value={[settings.size]}
            onValueChange={(value) => updateSettings({ size: value[0] })}
          />
        </div>

        {/* Opacity Control */}
        <div className="wt-form-group">
          <Label htmlFor="opacity">
            <Droplets size={16} />
            Opacity: {settings.opacity}%
          </Label>
          <Slider
            id="opacity"
            min={10}
            max={100}
            step={5}
            value={[settings.opacity]}
            onValueChange={(value) => updateSettings({ opacity: value[0] })}
          />
        </div>

        {/* Rotation Control */}
        <div className="wt-form-group">
          <Label htmlFor="rotation">
            <RotateCw size={16} />
            Rotation: {settings.rotation}°
          </Label>
          <Slider
            id="rotation"
            min={-180}
            max={180}
            step={5}
            value={[settings.rotation]}
            onValueChange={(value) => updateSettings({ rotation: value[0] })}
          />
        </div>

        {/* Quick Presets */}
        <div className="wt-form-group">
          <Label>Quick Presets</Label>
          <div className="wt-preset-buttons">
            {WATERMARK_PRESETS.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => handlePresetApply(preset.name)}
                title={preset.description}
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WatermarkControls
