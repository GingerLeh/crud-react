import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/items');
      setItems(response.data);
    } catch (error) {
      console.error('Erro ao buscar os itens:', error);
    }
  };

  const addItem = async () => {
    try {
      const newItem = { name, description };
      const response = await axios.post('http://localhost:3000/items', newItem);
      setItems([...items, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao criar o item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Erro ao excluir o item:', error);
    }
  };

  return (
    <div>
      <h1>CRUD Frontend</h1>
      <h2>Itens</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>{item.description}</span>
            <button onClick={() => deleteItem(item.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <h2>Adicionar Item</h2>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addItem}>Adicionar</button>
    </div>
  );
};

export default App;
