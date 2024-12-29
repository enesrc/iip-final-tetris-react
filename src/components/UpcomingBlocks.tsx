import { Block, SHAPES } from '../types'; // Blok ve şekil türlerini içe aktar

// UpcomingBlocks bileşeni için prop türlerini tanımlayın
interface Props {
  upcomingBlocks: Block[]; // Sıradaki blokların listesi
}

// UpcomingBlocks bileşenini tanımlayın
function UpcomingBlocks({ upcomingBlocks }: Props) {
  return (
    <div className="upcoming">
      {upcomingBlocks.map((block, blockIndex) => { // Her sıradaki bloğu render et
        const shape = SHAPES[block].shape.filter((row) =>
          row.some((cell) => cell)
        );
        return (
          <div key={blockIndex}>
            {shape.map((row, rowIndex) => { // Her satırı render et
              return (
                <div key={rowIndex} className="row">
                  {row.map((isSet, cellIndex) => { // Her hücreyi render et
                    const cellClass = isSet ? block : 'hidden'; // Hücre sınıfını belirle
                    return (
                      <div
                        key={`${blockIndex}-${rowIndex}-${cellIndex}`}
                        className={`cell ${cellClass}`}
                      ></div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
      <h1 className='title'>Sıradaki</h1> {/* Başlık */}
    </div>
  );
}

export default UpcomingBlocks; // UpcomingBlocks bileşenini dışa aktar