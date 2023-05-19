import { useEffect, useState } from 'react'
import {Button, Card, CloseButton, Col, Container, FloatingLabel, Form, Row} from 'react-bootstrap'

const url= 'http://127.0.0.1:8000'

const getComentarios = async ()=>{
  const resp = await fetch(url+'/api/list/', {
    headers: {
      "Content-Type": "application/json"
      },
    method: "get",
  })
    .then((result) => result.json())
    .catch((err) => console.log(err));
  
  return resp;
}

const postComentarios = async (data)=>{
  const resp = await fetch(url+'/api/list/', {
    headers: {
      "Content-Type": "application/json"
      },
    method: "post",
    body: JSON.stringify(data)
  })
    .then((result) => result.json())
    .catch((err) => console.log(err));
  
  return resp;
}

const deleteComentario = async (id)=>{
  const resp = await fetch(url+'/api/list/'+id, {
    headers: {
      "Content-Type": "application/json"
      },
    method: "delete",
    })
    .then((result) => result.json())
    .catch((err) => console.log(err));
  
  return resp;
}






function App() {
  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState('');

  const getComentariosAux = async () => {
    const resp = await getComentarios();
    setComentarios(resp)
  }

  const postComentarioAux = async (data) => {
    const resp = await postComentarios(data);
    const resp2 = await getComentarios();
    setComentarios(resp2);
  }

  const EnviarComentario = () => {
    const data = {item: comentario}
    postComentarioAux(data);
    setComentario('');
  }

  const EliminarComentarioAux = async (id) =>{
    const data = await deleteComentario(id);
    getComentariosAux();
  }

  useEffect(()=>{
    getComentariosAux();
  },[])

  return (
    <Container className='text-white'>
      <Row className='justify-content-center' style={{marginTop: 10}}>
        <Col xs='auto'>
          <h3>Código de ejemplo</h3>
        </Col>
      </Row>
      <Row className='justify-content-center' style={{marginTop: 15}}>
        <Col xs='auto'>
          <p>Este es un código de ejemplo donde interactúa el back con el front, es principalmente para que tengan algo donde guiarse.</p>
        </Col>
      </Row>
      <Row className='justify-content-center' style={{marginTop: 30}}>
        <Col xs={12} sm={11} md={8} lg={7} xl={6} xxl={6}>
          <Card body className='text-white'>
          <Form onSubmit={(e)=>{e.preventDefault(); EnviarComentario();}}>
            <Row className='justify-content-end'>  
              <Col xs={12}>
                <Form.Label>Ingrese un comentario para agregarlo a la base de datos</Form.Label>
                <FloatingLabel
                  controlId="text"
                  label="Comentario"
                >
                  <Form.Control value={comentario} maxLength={150} onChange={(e)=>{e.preventDefault(); setComentario(e.target.value)}} type="text" placeholder="Leave a comment here" />
                </FloatingLabel>
              </Col>
              <Col xs='auto' style={{marginTop: 10}}>
                <Button type='submit'>Enviar</Button>
              </Col>
            </Row>
          </Form>
          </Card>
        </Col>
      </Row>
      <Row className='justify-content-center' style={{marginTop: 30}}>
        <Col xs='auto'>
          <h5>Comentarios agregados a la base de datos: </h5>
        </Col>
      </Row>
      <Row style={{marginTop: 10}}>
        <Card body className='text-white'>
          <Row className='gy-3'>
            {comentarios?.map((comentario)=>{
              return(
                <Col xs={12} sm={12} md={6} lg={5} xl={3} xxl={3} key={comentario.id}>
                  <Card className='text-white'>
                    <Card.Header>
                      <Row className='justify-content-between'>
                        <Col xs='auto'>
                          id: {comentario.id}
                        </Col>
                        <Col xs='auto'>
                          <CloseButton onClick={(e)=>{e.preventDefault(); EliminarComentarioAux(comentario.id)}}/>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      {comentario.item}
                    </Card.Body>
                  </Card>
                </Col>
              )})
            }
          </Row>
        </Card>
      </Row>
    </Container>
  )
}

export default App
