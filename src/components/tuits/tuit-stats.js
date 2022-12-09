import React from "react";

const TuitStats = ({tuit, likeTuit,  dislikeTuit}) => {
    return (
        <div className="row">
            ...
            <div className="col">
        <span onClick={() => likeTuit(tuit)}>
        {
            tuit.stats.likes > 0 &&
            <i className="fas fa-heart"
               style={{color: 'red'}}></i>
        }
            {
                tuit.stats.likes <= 0 &&
                <i className="far fa-heart"></i>
            }
            {tuit.stats && tuit.stats.likes}
        </span>
                <span onClick={() => dislikeTuit(tuit)}>
        {
            tuit.stats.likes > 0 &&
            <i className="fas fa-heart"
               style={{color: 'red'}}></i>
        }
                    {
                        tuit.stats.likes <= 0 &&
                        <i className="far fa-heart"></i>
                    }
                    {tuit.stats && tuit.stats.likes}
        </span>
            </div>
            ...
        </div>
    );
}
export default TuitStats


// export default class TuitStats extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className="row mt-2">
//         <div className="col">
//           <i className="far fa-message me-1"></i>
//           {this.props.tuit.stats && this.props.tuit.stats.replies}
//         </div>
//         <div className="col">
//           <i className="far fa-retweet me-1"></i>
//           {this.props.tuit.stats && this.props.tuit.stats.retuits}
//         </div>
//         <div className="col">
//           <i className="far fa-heart me-1"></i>
//           {this.props.tuit.stats && this.props.tuit.stats.likes}
//         </div>
//         <div className="col">
//           <i className="far fa-inbox-out"></i>
//         </div>
//       </div>
//     );
//   }
// }