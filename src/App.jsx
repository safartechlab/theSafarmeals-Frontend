import AdminRouter from "./Router/Adminroute"
import Endrouter from "./Router/endroute"
import Shoprouter from "./Router/Shoproute"

function App() {

  return (
    <>
      <Endrouter/>
      <AdminRouter/>  
      <Shoprouter/>
    </>
  )
}

export default App
