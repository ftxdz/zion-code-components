import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { ConfirmModal } from './components/ConfirmModal';
import { UsageTracker } from './components/UsageTracker/UsageTracker';
import { Button } from 'antd';
import { useState } from 'react';

function App() {
  const [trigger, setTrigger] = useState<number>(0);
  const [currentUsage, setCurrentUsage] = useState<number>(0);

  return (
    <BrowserRouter>
      <div style={{ height: '100%', width: '100%' }}>
        <Button 
          onClick={() => setTrigger(prev => prev + 1)}
          style={{ marginBottom: '20px' }}
        >
          触发使用次数 +1 (当前：{currentUsage})
        </Button>

        <UsageTracker
          propData={{
            trigger: trigger,
          }}
          propState={{
            currentUsage: {
              get: () => currentUsage,
              set: setCurrentUsage,
            }
          }}
          event={{}}
        />

        <ConfirmModal
          propData={{
            buttonTitle: 'confirm',
            modalTitle: 'sure?',
          }}
          propState={{}}
          event={{}}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
