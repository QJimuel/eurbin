import { Outlet, Link } from "react-router-dom";
function RewardRecord() {

    
    return<>
    <h1 className="headings">Management</h1>
        <header className="management-header">
        <nav className="nav">
            <ul className="navList">
            <li >
                <Link to="/Record" >
                    <button >
                        <span role="img" aria-label="record">📋</span> Record
                    </button>
                </Link>
            </li>
            <li >
                <Link to="/Manage" >
                    <button >
                        <span role="img" aria-label="edit">✏️</span> Edit Reward
                    </button>
                </Link>
            </li>
            <li >
                <Link to="/Add" >
                    <button >
                        <span role="img" aria-label="add">➕</span> Add Reward
                    </button>
                </Link>
            </li>
            </ul>
        </nav>
        </header>
      
  <div className="content">
      <h1>EURBin</h1>

      <p>EURBin is a free app which rewards
          your recyclable waste with a points 
          that you can spend on cool products, 
          school supply or donate to environment 
          project inside the university.</p>


      <br /><br />
      <h4>by</h4>
  
      <h4>Raven Mendenueta</h4>
      <h4>Kacelyn Manalo</h4>
      <h4>Jimuel Querel</h4>
      </div>
   
</> ;
    
}
export default RewardRecord;