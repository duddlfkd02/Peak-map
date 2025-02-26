import { useState, useRef } from "react";
import InfiniteCompanyList from "./InfiniteCompanyList";
import CompanyDetail from "./CompanyDetail";
import { useCompanyStore } from "../stores/useCompanyStore";
import { useUIStore } from "../stores/useUIStore";

const SlidingPanel = () => {
  const { selectedCompany } = useCompanyStore();
  const { isPanelOpen } = useUIStore();

  const [panelHeight, setPanelHeight] = useState(30);
  const panelRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const prevHeight = useRef<number>(30);
  const isDragging = useRef(false);

  // 패널을 드래그하여 높이 조절하는 함수
  const handleStart = (clientY: number) => {
    startY.current = clientY;
    prevHeight.current = panelHeight;
    isDragging.current = true;
    console.log("handleStart", handleStart);
  };

  const handleMove = (clientY: number) => {
    if (!startY.current || !isDragging.current) return;
    const deltaY = startY.current - clientY;
    const newHeight = prevHeight.current + (deltaY / window.innerHeight) * 100;

    setPanelHeight(Math.min(80, Math.max(30, newHeight)));
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  /** ✅ 마우스 이벤트 (PC) */
  const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientY);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientY);
  const handleMouseUp = () => handleEnd();

  /** ✅ 터치 이벤트 (모바일) */
  const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientY);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientY);
  const handleTouchEnd = () => handleEnd();

  return (
    <div
      ref={panelRef}
      className={`fixed bottom-0 left-0 right-0 z-50 w-full overflow-hidden rounded-t-xl bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isPanelOpen ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ height: `${panelHeight}vh` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 패널 핸들 (드래그) */}
      <div className="flex h-12 w-full cursor-pointer items-center justify-center">
        <div className="h-1.5 w-12 rounded-full bg-gray-300"></div>
      </div>

      {/* 패널 내부 컨텐츠 */}
      <div className="h-full overflow-y-auto px-4 pb-4">
        {selectedCompany ? <CompanyDetail /> : <InfiniteCompanyList />}
      </div>
    </div>
  );
};

export default SlidingPanel;
