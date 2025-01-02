import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { ConfirmModal } from './components/ConfirmModal';
import { DocumentViewer } from './components/DocumentViewer';

function App() {
  const documentContent = `
要实现购物车功能，您可以按照以下步骤进行：
​
1. **商品加购功能**：
   - 在商品详情页面，用户可以通过“加入购物车”按钮将商品添加到购物车。需要在数据库中记录该商品的信息，包括用户ID、商品ID、数量、价格等。
   - 具体操作可以参考[这篇文档](https://docs.functorz.com/best-practice/add_to_cart_and_amount_calculation/add_to_cart_and_amount_calculation.html)。
​
2. **购物车页面设计**：
   - 购物车页面需要展示用户已加购的商品信息，可以使用列表组件来展示每个商品的名称、数量、单价和总价。
   - 购物车页面的设计示例可以参考以下图片：
     ![购物车页面设计示例](https://docs.functorz.com/static/image/1672827745115-29cd673a-c461-4a30-9f22-313b76f19301.png)
​
3. **商品数量修改**：
   - 用户可以在购物车中修改商品的数量。每次修改后，需要更新数据库中的数量，并刷新购物车页面以显示最新的状态。
   - 例如，当用户增加或减少商品数量时，系统需要根据数量的变化更新总价。
   - 具体的逻辑可以参考以下内容：
     - 当数量为1时，删除该商品记录；当数量大于1时，减少数量。
     - 需要在数据修改成功后刷新购物车列表和当前页面，以确保显示最新的数据。
​
4. **结算功能**：
   - 在购物车页面，用户可以选择结算。需要计算用户选择的商品的总金额，并进行相应的支付处理。
   - 结算时，系统会根据用户选择的商品和数量动态计算总金额。
​
5. **状态管理**：
   - 购物车中的每个商品需要有一个状态字段，标识该商品是否被选中用于结算。只有被选中的商品才会被计算在总金额中。
​
通过以上步骤，您可以在函子中实现一个基本的购物车功能。如果您需要更详细的操作步骤或有其他问题，请随时告诉我！`;

  return (
    <BrowserRouter>
      <div style={{ height: '100%', width: '100%' }}>
        {/* <DemoComp
          globalData={{}}
          setGlobalData={() => {
            //
          }}
          propData={{}}
          propState={{}}
          event={{}}
        /> */}
        <ConfirmModal
          propData={{
            buttonTitle: 'confirm',
            modalTitle: 'sure?',
          }}
          propState={{}}
          event={{}}
        />
      </div>
      <div style={{ height: '100%', width: '100%' ,background: '#515151',}}>
        <DocumentViewer
          propData={{
            content: documentContent,
            fontSize: '14px',
            textColor: '#FFFFFF',
            linkColor: '#1598FF',
            fontFamily: 'MiSans'
          }}
          event={{}}
          propState={{}}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
