function Skeleton() {
  return (
    <div className="flex justify-center">
      <div className="w-[75%] grid grid-cols-3 gap-10 max-md:grid-cols-2 max-sm:grid-cols-1">
        {Array(3)
          .fill(1)
          .map((index) => {
            return (
              <div
                className="flex flex-col bg-neutral-300 h-96 animate-pulse rounded-xl p-4 gap-4"
                key={index}
              >
                <div className="bg-neutral-400/50 w-full h-44 animate-pulse rounded-md"></div>
                <div className="flex flex-col gap-2">
                  <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                  <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                  <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                  <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Skeleton;
