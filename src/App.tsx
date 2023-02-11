import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Modal from "./components/Modal";

type Usuario = {
  id: number;
  name: string;
};

type Payment = {
  id?: string;
  userId?: string;
  description?: string;
  value?: number;
};

const users = [
  { id: 1, name: "Alberto Quintero" },
  { id: 2, name: "Alicia Cardin" },
  { id: 3, name: "Amandio Igrejas" },
];

function Payments() {
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment>();

  function handleDeletePayment(id?: string) {
    setPayments(payments.filter((payment) => payment.id !== id));
  }

  const handlePaymentSelection = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPayment(undefined);
    setShowModal(false);
  };

  useEffect(() => {
    if (!selectedUser) return;

    axios
      .get(`https://localhost:7278/payments/user/${selectedUser.id}`)
      .then(({ data }) => setPayments(data));
  }, [selectedUser]);

  const handleUserSelection = (user: Usuario) => {
    setSelectedUser(user);
  };

  return (
    <div className="container">
      <h2>Selecione um usuário:</h2>
      <br />
      <ul>
        {users.map((user: Usuario) => (
          <li key={user.id} onClick={() => handleUserSelection(user)}>
            {user.name}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <>
          <h2>Pagamentos do usuário selecionado:</h2>
          <table>
            <thead>
              <tr>
                <th>Tipo da conta</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    {payment.description}
                  </td>
                  <td>
                    <button onClick={() => handlePaymentSelection(payment)}>
                      Visualizar
                    </button>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeletePayment(payment.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && (
            <Modal onClose={handleCloseModal}>
              <h3>Informações do pagamento</h3>
              <hr />
              {selectedPayment && (
                <>
                  <p>
                    <strong>ID:</strong> {selectedPayment.id}
                  </p>
                  <p>
                    <strong>Valor: R$ </strong> {selectedPayment.value}
                  </p>
                  <p>
                    <strong>Descricao:</strong> {selectedPayment.description}
                  </p>
                </>
              )}
            </Modal>
          )}
        </>
      )}
    </div>
  );
}

export default Payments;
