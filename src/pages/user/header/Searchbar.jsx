import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { setsearch } from '../../../store/slice/searchbtn';

const Searchbar = () => {

    const dispatch = useDispatch()
    const show = useSelector((state)=>state.searchbar.searchbarbtn)

    const hanldebtnclose = () =>{
        dispatch(setsearch())
    }


    return(
        <>
        <Offcanvas show={show} onHide={hanldebtnclose}
        placement="top"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          Your content goes here (menu, search, filters, etc.)
        </Offcanvas.Body>
      </Offcanvas>
        </>
    )
}

export default Searchbar