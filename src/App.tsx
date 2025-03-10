import { BrowserRouter } from "react-router-dom";
import "./App.scss";
// import { ConfirmModal } from './components/ConfirmModal';
// import { UsageTracker } from './components/UsageTracker/UsageTracker';
import { DocumentViewer } from "./components/DocumentViewer/DocumentViewer";
// import { Button } from 'antd';
// import { useState } from 'react';

function App() {
  // const [trigger, setTrigger] = useState<number>(0);
  // const [currentUsage, setCurrentUsage] = useState<number>(0);

  return (
    <BrowserRouter>
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#252525", // 添加背景颜色
        }}
      >
        <DocumentViewer
          propData={{
            content:
              "关于如何创建评论列表的数据模型，以下是一些具体步骤和建议： 1. **定义数据表**： - 创建一个名为 `Comments` 的数据表。 - 定义字段，例如： - `CommentID`：唯一标识符，用于区分每条评论。 - `UserID`：评论者的用户ID，用于关联用户信息。 - `Content`：评论内容，存储用户的评论文本。 - `Timestamp`：评论时间，记录评论的创建时间。 - `PostID`：关联的帖子或文章ID，用于标识评论所属的内容。 2. **设置字段类型**： - `CommentID` 和 `UserID` 可以使用整数类型。 - `Content` 使用文本类型，以支持较长的评论内容。 - `Timestamp` 使用日期时间类型，以便记录精确的时间。 - `PostID` 使用整数类型，确保与相关内容的关联。 3. **关系定义**： - 使用外键将 `UserID` 关联到用户表，以便获取评论者的详细信息。 - 使用外键将 `PostID` 关联到帖子或文章表，以便获取评论所属的内容。 4. **数据绑定**： - 将 `Comments` 表与UI组件绑定，实现评论的动态展示。 - 使用函子的动态绑定功能来实现实时数据更新。 5. **测试与优化**： - 测试数据模型的性能和准确性，确保数据能够正确存储和检索。 - 根据测试结果优化数据模型，例如调整字段类型或索引设置。 如果你需要更详细的指导或具体的操作步骤，请告诉我，我可以为你提供相关文档的链接或更详细的说明。",
            fontSize: "16px",
            textColor: "#FFFFFF",
            linkColor: "#1598FF",
            fontFamily: "MiSans",
            codeColor: "#c7254e",
            codeBgColor: "#f9f2f4",
          }}
          propState={{}}
          event={{}}
        />

        {/* ... existing code ... */}
      </div>
    </BrowserRouter>
    // <BrowserRouter>
    //   <div style={{ height: '100%', width: '100%' }}>
    //     <Button
    //       onClick={() => setTrigger(prev => prev + 1)}
    //       style={{ marginBottom: '20px' }}
    //     >
    //       触发使用次数 +1 (当前：{currentUsage})
    //     </Button>

    //     <UsageTracker
    //       propData={{
    //         trigger: trigger,
    //       }}
    //       propState={{
    //         currentUsage: {
    //           get: () => currentUsage,
    //           set: setCurrentUsage,
    //         }
    //       }}
    //       event={{}}
    //     />

    //     <ConfirmModal
    //       propData={{
    //         buttonTitle: 'confirm',
    //         modalTitle: 'sure?',
    //       }}
    //       propState={{}}
    //       event={{}}
    //     />
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
