import { CellOptions } from '../types'; // Hücre seçeneklerini içeren türleri içe aktar

// Cell bileşeni için prop türlerini tanımlayın
interface Props {
  type: CellOptions; // Hücre türü [empty ya da block]
}

// Cell bileşenini tanımlayın
function Cell({ type }: Props) {
  // Hücreyi render et ve hücre türüne göre CSS sınıfı ekle
  return <div className={`cell ${type}`} />;
}

export default Cell; // Cell bileşenini dışa aktar