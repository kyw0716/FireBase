import { doc, DocumentData, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { DBService } from "@FireBase"
import ImageCard from "../../share/ImageCard"

type Props = {
  userId: string
  userName: string
}

const Style = {
  ProfilePageImage: styled.img`
    width: 200px;
    height: 200px;
  `,
  ImageCard: styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  ImageContainer: styled.div`
    display: flex;
    width: 100vw;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 50px;
  `,
}

export default function ProfilePageImageList({ userId, userName }: Props) {
  const [userData, setUserData] = useState<DocumentData>()
  const [imageData, setImageData] = useState<
    { image: string; imageTitle: string; private: boolean }[]
  >([])

  useEffect(() => {
    const userDataRef = doc(DBService, "userData", `${userId}`)
    onSnapshot(userDataRef, { includeMetadataChanges: true }, (doc) => {
      setUserData(doc.data())
    })
  }, [])
  useEffect(() => {
    if (userData !== undefined) setImageData(userData.images)
  }, [userData])

  return (
    <Style.ImageContainer>
      {imageData !== undefined &&
        imageData.map((data, index) => {
          return (
            <ImageCard
              key={index}
              userId={userId}
              userName={userName}
              imageTitle={data.imageTitle}
              imageUrl={data.image}
              isPrivate={data.private}
              isMainPage={false}
            />
          )
        })}
    </Style.ImageContainer>
  )
}