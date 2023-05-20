import { useState } from 'react';
import styles from './app.module.css';
import powerImage from './assets/powered.png'
import {levels, caculateImc, level} from './helpers/imc'
import {GridItem} from './components/gridItem/GridItem'
import leftArrowImage from './assets/leftarrow.png'

 


function App() {

  const [heightField, setHeigthField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0)
  const [toShow, setToShow] = useState <level | null>(null)
  const handleCalculateButton = () => {
      if(heightField && weightField){
        setToShow(caculateImc(heightField, weightField))
      } else {
        alert("Digite em todos os campos")
      }
  }

    const handleBackButton = () => {
       setToShow(null);
       setHeigthField(0);
       setWeightField(0);
    }

  return (
    <div className={styles.main} >
      <header>
        <div className={styles.headerContainer}>
        <img src={powerImage} alt='' width={150} onClick={handleBackButton}/>
        </div>        
      </header>
      <div className={styles.container}>
        <div className={styles.leftside}>
          <h1>Cacule o seu IMC.</h1>

          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
          
          <input
          type="number"
          placeholder='Digite a sua altura'
          value={heightField > 0 ? heightField : ''}
          onChange={e => setHeigthField(parseFloat(e.target.value))}
          disabled={toShow? true : false}            
          />

          <input 
          type="number"
          placeholder='Digite o seu peso'
          value={weightField > 0 ? weightField : ''}
          onChange={e => setWeightField(parseFloat(e.target.value))}
          disabled={toShow? true : false}          
          /> 

          <button onClick={handleCalculateButton} disabled={toShow? true : false}   >Calcular</button>

        </div>


        <div className={styles.rightside} >
          
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
               <GridItem key={key} item={item}/> 
              ))}
            </div>
          }

        {toShow && 
          <div className={styles.rightBig}>
            <div className={styles.rightArrow} onClick={handleBackButton} >
              <img src={leftArrowImage} alt="" width={25}/>
            </div>
            <GridItem item={toShow}/>
          </div>
          
        
        }

        </div>

      </div>
    </div>
  );
}

export default App;
