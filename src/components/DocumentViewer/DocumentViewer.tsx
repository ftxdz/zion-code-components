import './DocumentViewer.scss';
import { marked } from 'marked';

export interface DocumentViewerPropData {
  content: string;
  fontSize?: string;        // 字体大小
  textColor?: string;       // 字体颜色
  linkColor?: string;       // 超链接颜色
  fontFamily?: string;      // 字体
  boldColor?: string;       // 粗体文字颜色
  boldBgColor?: string;     // 粗体背景颜色
  codeColor?: string;       // 代码文字颜色
  codeBgColor?: string;     // 代码背景颜色
}
export interface DocumentViewerStateData {}

export interface DocumentViewerEvent {}

export interface DocumentViewerProps {
  propData: DocumentViewerPropData;
  event: DocumentViewerEvent;
  propState: DocumentViewerStateData;
}

export function DocumentViewer({ propData }: DocumentViewerProps) {
  // 配置 marked 选项
  marked.use({
    renderer: {
      link(this: typeof marked.Renderer.prototype, { href, text }: { href: string; title?: string | null; text: string }) {
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      }
    }
  });

  const htmlContent = marked(propData.content);
  
  const customStyle = {
    '--text-color': propData.textColor || '#FFF',
    '--font-size': propData.fontSize || '14px',
    '--link-color': propData.linkColor || '#1598FF',
    '--font-family': propData.fontFamily || 'MiSans',
    '--bold-color': propData.boldColor || '#FFF',
    '--bold-bg-color': propData.boldBgColor || 'transparent',
    '--code-color': propData.codeColor || '#333',
    '--code-bg-color': propData.codeBgColor || 'transparent',
  } as React.CSSProperties;

  return (
    <div className="document-viewer">
      <div 
        className="document-content"
        style={customStyle}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
} 