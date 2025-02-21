import prevArrow from "../../assets/images/left-arrow.svg"
import nextArrow from "../../assets/images/right-arrow.svg"

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChage: (page:number) => void;
}


const Pagination:React.FC<PaginationProps> = ({currentPage, totalPage, onPageChage})=>{
  return (
    <div className="flex justify-between items-center mt-5 ">
      {/* 이전 */}
      <button
      onClick={()=>onPageChage(currentPage - 1)}
      disabled={currentPage === 1}>
        <img src={prevArrow} alt="이전 버튼" />
      </button>

      {/* 페이지 번호*/}

      {Array.from({length: totalPage}, (_, index)=>(
        <button key={index + 1}
        onClick={()=> onPageChage(index + 1)}
        className={`px-3 py-1 mx-1  ${
          currentPage === index + 1 ? "bg-[#333333] text-white rounded-full" : ""
        }`}>
          {index + 1}
        </button>
      ))}


      {/* 다음 */}
      <button
      onClick={()=>onPageChage(currentPage + 1)}
      disabled={currentPage === totalPage}>
        <img src={nextArrow} alt="다음 버튼" />
      </button>
    </div>
  )
}
export default Pagination


