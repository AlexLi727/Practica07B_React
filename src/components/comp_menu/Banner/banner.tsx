
import "./Banner.css";



//Interfaz del componente "Banner"
interface BannerProps {
  title: string;
}



const Banner: React.FC<BannerProps> = ({ title }) => {
  return (
    <header className="banner">
      <a href="/">Inicio</a>
      <h1 className="banner-title">{title}</h1>
        {/* 🔹 Selector con icono de idioma */}
        <div className="banner-lang">
        <i className="fas fa-globe"></i> {/* 🔹 Icono de idioma */}
        <select name="lang" id="lang">
          <option value="spanish">Español</option>
          <option value="english">English</option>
        </select>
      </div>
    </header>
  );
};

export default Banner;
