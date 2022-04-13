import Identicon from 'identicon.js'

const Header = ({ web3Handler, account}) => {

    return (
      <nav className="navbar navbar-dark navbar-expand-sm sticky-top bg-success d-flex justify-content-between mb-5 shadow">
          <a
            className="ml-2 bg-white text-success navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Smart Swapper
          </a>

          <div className='p-4 d-flex text-white'>
          {
             account 
             ?
             (<p className='bg-white text-success p-2'>{ account.slice(0 , 5) + '...' + account.slice(38 , 42) }</p>)
             :
            (
              <button onClick={web3Handler} className="btn btn-outline-success" >Connect Wallet</button>
            ) 
          }
            
           {
             account 
             ?
             <div>
               <img 
                className='ml-2'
                height={30}
                width={30}
                src={`data:image/png;base64,${new Identicon(account, 30).toString() }`}
                alt=''
               />
             </div>
             :
             <div></div>
            }
          </div>
      </nav>
    );
}

export default Header;
