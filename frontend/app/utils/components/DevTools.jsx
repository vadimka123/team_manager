import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';


const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' defaultIsVisible={false} defaultSize={0.2}>
        <LogMonitor theme='summerfruit' expandActionRoot={false} expandStateRoot={false} />
    </DockMonitor>
);

export default DevTools;
