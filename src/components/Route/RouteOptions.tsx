interface RouteOptionsProps {
  priority: "TIME" | "DISTANCE";
  setPriority: (value: "TIME" | "DISTANCE") => void;
}

const RouteOptions = ({ priority, setPriority }: RouteOptionsProps) => {
  return (
    <>
      {/* 최단 시간 ,거리 선택 옵션 */}
      <div className="absolute left-4 top-4 z-50 rounded bg-white p-2 shadow dark:text-black">
        <label className="text-sm font-semibold">경로 기준:</label>
        <select
          className="ml-2 rounded border p-1"
          value={priority}
          onChange={(e) => setPriority(e.target.value as "TIME" | "DISTANCE")}
        >
          <option value="TIME">최단 시간</option>
          <option value="DISTANCE">최단 거리</option>
        </select>
      </div>
    </>
  );
};

export default RouteOptions;
