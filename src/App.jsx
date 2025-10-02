
import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'

function App() {
 
  return (
    <div className="w-[600px] h-[600px] border- bg-gray-400 relative">
      <div className="w-[500px] h-[500px] bg-amber-100 flex flex-col items-center justify-center">
        <div className="w-[100px] h-[100px] bg-red-500">

        </div>
        <div className="w-[100px] h-[100px] bg-blue-500 fixed left-[550px] top-[550px]">

        </div>
        <div className="w-[100px] h-[100px] bg-green-500">

        </div>
        <div className="w-[100px] h-[100px] bg-pink-700 absolute right-[80px] bottom-[80px]">

        </div>

      </div>

    </div>
  )
}

export default App
