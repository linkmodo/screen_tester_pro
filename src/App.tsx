import { useState, useCallback } from 'react';
import { Header, Sidebar, Footer } from './components/Layout';
import { Modal } from './components/UI/Modal';
import {
  DeadPixelTest,
  UniformityTest,
  ColorGradientTest,
  ResponseTimeTest,
  ContrastTest,
  BrightnessTest,
  TextClarityTest,
  ViewingAngleTest,
  BurnInFixTest,
} from './components/Tests';
import { useFullscreen } from './hooks/useFullscreen';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useTestState } from './hooks/useTestState';
import { TestType } from './types/test';
import { DEAD_PIXEL_COLORS } from './utils/constants';
import './styles/globals.css';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const {
    selectedTest,
    setSelectedTest,
    isPaused,
    togglePause,
    config,
    updateConfig,
    resetConfig,
  } = useTestState();

  const handleNext = useCallback(() => {
    if (selectedTest === 'dead-pixel') {
      const nextIndex = (config.deadPixel.currentColorIndex + 1) % DEAD_PIXEL_COLORS.length;
      updateConfig('deadPixel', { currentColorIndex: nextIndex });
    }
  }, [selectedTest, config.deadPixel.currentColorIndex, updateConfig]);

  const handlePrev = useCallback(() => {
    if (selectedTest === 'dead-pixel') {
      const prevIndex = (config.deadPixel.currentColorIndex - 1 + DEAD_PIXEL_COLORS.length) % DEAD_PIXEL_COLORS.length;
      updateConfig('deadPixel', { currentColorIndex: prevIndex });
    }
  }, [selectedTest, config.deadPixel.currentColorIndex, updateConfig]);

  const handleIncrease = useCallback(() => {
    if (selectedTest === 'response-time') {
      const newSpeed = Math.max(250, config.responseTime.speed - 250);
      updateConfig('responseTime', { speed: newSpeed });
    }
  }, [selectedTest, config.responseTime.speed, updateConfig]);

  const handleDecrease = useCallback(() => {
    if (selectedTest === 'response-time') {
      const newSpeed = Math.min(2000, config.responseTime.speed + 250);
      updateConfig('responseTime', { speed: newSpeed });
    }
  }, [selectedTest, config.responseTime.speed, updateConfig]);

  const handleReset = useCallback(() => {
    const testKeyMap: Record<TestType, keyof typeof config> = {
      'dead-pixel': 'deadPixel',
      'uniformity': 'uniformity',
      'gradient': 'gradient',
      'response-time': 'responseTime',
      'contrast': 'contrast',
      'brightness': 'brightness',
      'text-clarity': 'textClarity',
      'viewing-angle': 'viewingAngle',
      'burn-in-fix': 'burnInFix',
    };
    resetConfig(testKeyMap[selectedTest]);
  }, [selectedTest, resetConfig]);

  useKeyboardShortcuts({
    onTestChange: setSelectedTest,
    onToggleFullscreen: toggleFullscreen,
    onTogglePause: togglePause,
    onReset: handleReset,
    onShowHelp: () => setShowHelpModal(true),
    onNext: handleNext,
    onPrev: handlePrev,
    onIncrease: handleIncrease,
    onDecrease: handleDecrease,
  });

  const renderTest = () => {
    switch (selectedTest) {
      case 'dead-pixel':
        return (
          <DeadPixelTest
            currentColorIndex={config.deadPixel.currentColorIndex}
            autoMode={config.deadPixel.autoMode}
            interval={config.deadPixel.interval}
            isPaused={isPaused}
            customColor={config.deadPixel.customColor}
            useCustomColor={config.deadPixel.useCustomColor}
            onColorChange={(index) => updateConfig('deadPixel', { currentColorIndex: index })}
            onAutoModeChange={(auto) => updateConfig('deadPixel', { autoMode: auto })}
            onIntervalChange={(interval) => updateConfig('deadPixel', { interval })}
            onCustomColorChange={(customColor) => updateConfig('deadPixel', { customColor })}
            onUseCustomColorChange={(useCustomColor) => updateConfig('deadPixel', { useCustomColor })}
          />
        );
      case 'uniformity':
        return (
          <UniformityTest
            color={config.uniformity.color}
            brightness={config.uniformity.brightness}
            gridEnabled={config.uniformity.gridEnabled}
            gridSize={config.uniformity.gridSize}
            onColorChange={(color) => updateConfig('uniformity', { color })}
            onBrightnessChange={(brightness) => updateConfig('uniformity', { brightness })}
            onGridEnabledChange={(gridEnabled) => updateConfig('uniformity', { gridEnabled })}
            onGridSizeChange={(gridSize) => updateConfig('uniformity', { gridSize })}
          />
        );
      case 'gradient':
        return (
          <ColorGradientTest
            direction={config.gradient.direction}
            steps={config.gradient.steps}
            preset={config.gradient.preset}
            onDirectionChange={(direction) => updateConfig('gradient', { direction })}
            onStepsChange={(steps) => updateConfig('gradient', { steps })}
            onPresetChange={(preset) => updateConfig('gradient', { preset })}
          />
        );
      case 'response-time':
        return (
          <ResponseTimeTest
            speed={config.responseTime.speed}
            shape={config.responseTime.shape}
            direction={config.responseTime.direction}
            showTrail={config.responseTime.showTrail}
            isPaused={isPaused}
            objectColor={config.responseTime.objectColor}
            onSpeedChange={(speed) => updateConfig('responseTime', { speed })}
            onShapeChange={(shape) => updateConfig('responseTime', { shape })}
            onDirectionChange={(direction) => updateConfig('responseTime', { direction })}
            onShowTrailChange={(showTrail) => updateConfig('responseTime', { showTrail })}
            onObjectColorChange={(objectColor) => updateConfig('responseTime', { objectColor })}
          />
        );
      case 'contrast':
        return (
          <ContrastTest
            gridSize={config.contrast.gridSize}
            onGridSizeChange={(gridSize) => updateConfig('contrast', { gridSize })}
          />
        );
      case 'brightness':
        return (
          <BrightnessTest
            brightness={config.brightness.brightness}
            windowSize={config.brightness.windowSize}
            onBrightnessChange={(brightness) => updateConfig('brightness', { brightness })}
            onWindowSizeChange={(windowSize) => updateConfig('brightness', { windowSize })}
          />
        );
      case 'text-clarity':
        return (
          <TextClarityTest
            fontSize={config.textClarity.fontSize}
            fontFamily={config.textClarity.fontFamily}
            letterSpacing={config.textClarity.letterSpacing}
            lineHeight={config.textClarity.lineHeight}
            onFontSizeChange={(fontSize) => updateConfig('textClarity', { fontSize })}
            onFontFamilyChange={(fontFamily) => updateConfig('textClarity', { fontFamily })}
            onLetterSpacingChange={(letterSpacing) => updateConfig('textClarity', { letterSpacing })}
            onLineHeightChange={(lineHeight) => updateConfig('textClarity', { lineHeight })}
          />
        );
      case 'viewing-angle':
        return (
          <ViewingAngleTest
            pattern={config.viewingAngle.pattern}
            showIndicators={config.viewingAngle.showIndicators}
            onPatternChange={(pattern) => updateConfig('viewingAngle', { pattern })}
            onShowIndicatorsChange={(showIndicators) => updateConfig('viewingAngle', { showIndicators })}
          />
        );
      case 'burn-in-fix':
        return (
          <BurnInFixTest
            settings={config.burnInFix}
            onSettingsChange={(settings) => updateConfig('burnInFix', settings)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {!isFullscreen && (
        <>
          <Header
            onShowHelp={() => setShowHelpModal(true)}
          />
          <Sidebar
            selectedTest={selectedTest}
            onSelectTest={setSelectedTest}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          <Footer selectedTest={selectedTest} isPaused={isPaused} />
        </>
      )}

      <main
        className={`transition-all duration-300 ${
          isFullscreen
            ? 'fixed inset-0'
            : `pt-[60px] pb-[40px] ${sidebarCollapsed ? 'pl-[72px]' : 'pl-[280px]'}`
        }`}
      >
        <div className={`${isFullscreen ? 'h-full' : 'h-[calc(100vh-100px)]'}`}>
          {renderTest()}
        </div>
      </main>

      <Modal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        title="Keyboard Shortcuts"
      >
        <div className="space-y-4 text-gray-300">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-white mb-2">Navigation</h4>
              <ul className="space-y-1 text-sm">
                <li><kbd className="bg-[#333] px-2 py-0.5 rounded">1-9</kbd> Switch tests</li>
                <li><kbd className="bg-[#333] px-2 py-0.5 rounded">←/→</kbd> Navigate options</li>
                <li><kbd className="bg-[#333] px-2 py-0.5 rounded">?</kbd> Show this help</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Controls</h4>
              <ul className="space-y-1 text-sm">
                <li><kbd className="bg-[#333] px-2 py-0.5 rounded">F</kbd> or <kbd className="bg-[#333] px-2 py-0.5 rounded">F11</kbd> Fullscreen</li>
                <li><kbd className="bg-[#333] px-2 py-0.5 rounded">Space</kbd> Pause/Resume</li>
                <li><kbd className="bg-[#333] px-2 py-0.5 rounded">R</kbd> Reset test</li>
                <li><kbd className="bg-[#333] px-2 py-0.5 rounded">+/-</kbd> Adjust speed</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#333] pt-4">
            <h4 className="font-medium text-white mb-2">Tests</h4>
            <ul className="grid grid-cols-2 gap-1 text-sm">
              <li><kbd className="bg-[#333] px-2 py-0.5 rounded">1</kbd> Dead Pixel</li>
              <li><kbd className="bg-[#333] px-2 py-0.5 rounded">2</kbd> Uniformity</li>
              <li><kbd className="bg-[#333] px-2 py-0.5 rounded">3</kbd> Color Gradient</li>
              <li><kbd className="bg-[#333] px-2 py-0.5 rounded">4</kbd> Response Time</li>
              <li><kbd className="bg-[#333] px-2 py-0.5 rounded">5</kbd> Contrast</li>
              <li><kbd className="bg-[#333] px-2 py-0.5 rounded">6</kbd> Brightness</li>
              <li><kbd className="bg-[#333] px-2 py-0.5 rounded">7</kbd> Text Clarity</li>
              <li><kbd className="bg-[#333] px-2 py-0.5 rounded">8</kbd> Viewing Angle</li>
              <li><kbd className="bg-[#333] px-2 py-0.5 rounded">9</kbd> Burn-In Prevention</li>
            </ul>
          </div>
          <div className="border-t border-[#333] pt-4 text-center">
            <p className="text-sm text-gray-400">
              Built by <span className="text-white font-medium">Li Fan</span>, 2026
            </p>
            <a 
              href="https://github.com/linkmodo/screen_tester_pro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-sm text-[#00d9ff] hover:text-[#00ff00] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub Repository
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
