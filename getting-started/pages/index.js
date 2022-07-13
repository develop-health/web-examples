import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client"
import { client } from '../lib/client'

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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_PATIENTS,
  });
  return {
    props: {
      data
    },
  };
}

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Patients ({data.patient_aggregate.aggregate.count})
        </h1>
        <div>
          {data.patient_aggregate.nodes.map(patient => (
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
