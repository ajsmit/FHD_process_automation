import { Card } from '@/components/ui/card';
import { SidebarItem } from '@/components/ui/sidebar-item';

interface DashboardSidebarProps {
  modules: string[];
  activeModule: string;
  onSelectModule: (moduleKey: string) => void;
}

export function DashboardSidebar({ modules, activeModule, onSelectModule }: DashboardSidebarProps) {
  return (
    <Card className='h-fit'>
      <h1 className='mb-3 text-lg font-bold'>FHD Dashboard</h1>
      <div className='space-y-1'>
        {modules.map((moduleName) => (
          <SidebarItem
            key={moduleName}
            label={moduleName.replace('_', ' ')}
            active={moduleName === activeModule}
            onClick={() => onSelectModule(moduleName)}
          />
        ))}
      </div>
    </Card>
  );
}
