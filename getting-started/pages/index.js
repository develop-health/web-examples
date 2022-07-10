import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { gql, useQuery } from "@apollo/client"

const GET_PATIENTS = gql`
  query GetPatients {
    patient_aggregate {
      aggregate {
        count
      }
      nodes {
        _id
        birth_date
        gender
        photo {
          data
        }
        name {
          family
          given
        }
      }
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(GET_PATIENTS);

  if (error) return <p>Could not fetch patients</p>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Patients {!loading && `(${data.patient_aggregate.aggregate.count})`}
        </h1>
        <div>
          {loading ? (<h2>Loading...</h2>) : data.patient_aggregate.nodes.map(patient => (
            <div className={styles.card} key={patient._id}>
              <Image src={patient.photo[0].data} width={72} height={72} />
              <h3>{patient.name[0].given} {patient.name[0].family}</h3>
              <p>{patient.birth_date} {patient.gender}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
