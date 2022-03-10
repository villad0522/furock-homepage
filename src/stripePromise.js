
import { loadStripe } from '@stripe/stripe-js';

//すべてのレンダリングでStripeオブジェクトが再作成されないように、
//コンポーネントのレンダリングの外側でloadStripeを呼び出すようにしてください。
//これは、テストで公開可能なAPIキーです。
const stripePromise = loadStripe('pk_test_51J1WraFCqAmNYICQxG4x8Mh1LNRfen9owDbmUFiZ9x6y3NtTOtJWL6sCvYS8rkwvuaIB27oCDfqcptQqQ18GdZGB00ZuW0loAc');
export default stripePromise;