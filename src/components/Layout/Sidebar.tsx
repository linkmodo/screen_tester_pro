import { TestType, TestConfig } from '../../types/test';
import { TESTS } from '../../utils/constants';

interface SidebarProps {
  selectedTest: TestType;
  onSelectTest: (test: TestType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  selectedTest,
  onSelectTest,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const coreTests = TESTS.filter((t) => t.category === 'core');
  const extendedTests = TESTS.filter((t) => t.category === 'extended');

  const renderTestButton = (test: TestConfig) => (
    <button
      key={test.id}
      onClick={() => onSelectTest(test.id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
        selectedTest === test.id
          ? 'bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/30'
          : 'text-gray-300 hover:bg-[#1a1a1a] hover:text-white'
      }`}
    >
      <span className="text-xl">{test.icon}</span>
      {!isCollapsed && (
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-medium truncate">{test.name}</span>
            <span className="text-xs text-gray-500 ml-2">{test.shortcut}</span>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">{test.description}</p>
        </div>
      )}
    </button>
  );

  return (
    <aside
      className={`fixed left-0 top-[60px] bottom-0 bg-[#0f0f0f] border-r border-[#1a1a1a] transition-all duration-300 z-30 overflow-y-auto ${
        isCollapsed ? 'w-[72px]' : 'w-[280px]'
      }`}
    >
      <div className="p-4">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-colors mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="space-y-6">
          <div>
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
                Core Tests
              </h3>
            )}
            <div className="space-y-1">{coreTests.map(renderTestButton)}</div>
          </div>

          <div>
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
                Extended Tests
              </h3>
            )}
            <div className="space-y-1">{extendedTests.map(renderTestButton)}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
