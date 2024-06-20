import './index.css';
export const Home = () => {
  return (
    <div className="homeContainer">
      <div className="homeApp">
        <div className='homeTitle'><h1>UniConnect</h1></div>
        <div className='homeContent1'>
          <div className='homeContent1_textContent'>
            <div className='homeContent1_textContent_text'><p>Descubra seu potencial com a Unisinos e explore novas oportunidades!</p></div>
            <div className='homeContent1_textContent_link'><a href="#">Link</a></div>
          </div>
          <div className='homeContent1_imgContent'></div>
        </div>
        <div className='homeContent2'>
          <div className='homeContent2_imgContent'></div>
          <div className='homeContent2_textContent'>
            <div className='homeContent2_textContent_text'>
              <a href='https://www.unisinos.br/'>Conheça a Unisinos</a>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
