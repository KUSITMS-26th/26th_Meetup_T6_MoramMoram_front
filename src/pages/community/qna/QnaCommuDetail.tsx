import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Common from "../../../components/community/Common";
import styles from "../../../components/community/CommunityDetail.module.css";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CommunityDetail from "components/community/CommunityDetail";
import Comment from "components/community/Comment";

const QnaCommuDetail = () => {
  const params:string = useParams().questionBoardId;
  const [lists, setLists] = useState<any>();
  const [commentLists, setCommentLists] = useState<any>();
  const [comments, setComments] = useState<any>();
  const detailRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const onCommentsHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComments(event.currentTarget.value)
  }

  const getLists = async () => {    

    try {
      axios.get(`/questions/${params}`)
        .then(
          (response) => {
            if(response.data.isSuccess)
              setLists(response.data.result);
              
              console.log('response.data.result: ', response.data.result)
          }
        );
    } catch (err) {
      console.log('communitu detail err', err)

    }
  }

    const getCommentLists = () => {
    try {
      axios.get(`/questions/${params}/replylist?page=0`)
        .then(
          (response) => {
              setCommentLists(response.data); 
              console.log("c", response.data);
          }
        );
    } catch (err) {
      console.log('communitu detail err', err)

    }
  }
  
  const onSubmitReply = async (e: any) => {
    e.preventDefault();
    await axios.post(`/questions/${params}/replies`, {
      replyText: comments
    })
    .then((res) => {
      if(res.data.isSuccess){
        alert(res.data.message);
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    detailRef.current?.scrollIntoView();
   
    getLists();
     getCommentLists();
}, []);

  const prevQna = ({ }) => {
    lists && navigate(`/community/questions/${lists.questionBoardId - 1}`);
    window.location.reload();
  }

  const nextQna = ({ }) => {
    lists && navigate(`/community/questions/${lists.questionBoardId + 1}`);
    window.location.reload();
  }

  

  return (
    <div ref={detailRef}>
      <Common title="???????????????">
        <CommunityDetail lists={lists} url="questions" prevBtn={prevQna} nextBtn={nextQna} />
      </Common>
      {/* ?????? */}
      <div className={styles.comment_wrap}>
        <div className={styles.inner_wrap}>

          <div className={styles.comment_title}>
            ?????? { commentLists ? commentLists.length : '0'}
          </div>          

          <form style={{ fontSize: "0", lineHeight: "0" }} onSubmit={onSubmitReply}>
            <div><textarea placeholder="????????? ????????? ?????????." className={styles.comment_area} onChange={onCommentsHandler} /></div>
            <button type="submit" className={styles.comment_btn}>????????????</button>
          </form>

          
           {
            commentLists &&
              <Comment lists={commentLists} params={params} />
          }

        
        

        </div>


      </div>


    </div>

  )
}

export default QnaCommuDetail;