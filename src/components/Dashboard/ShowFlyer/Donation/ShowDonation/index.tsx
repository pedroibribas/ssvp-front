import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { DeleteDonation } from "../DeleteDonation";
import { DeleteDonator } from "../DeleteDonator";

interface Donation {
  _id: string
  title: string
  donator?: string
}

interface ShowDonationProps {
  donation: Donation;
}

export function ShowDonation(props: ShowDonationProps) {

  const [isOpenDeleteDonationModal, setIsOpenDeleteDonationModal] = useState(false);
  const [isOpenDeleteDonatorModal, setIsOpenDeleteDonatorModal] = useState(false);
  const openDeleteDonationModal = () => setIsOpenDeleteDonationModal(!isOpenDeleteDonationModal);
  const openDeleteDonatorModal = () => setIsOpenDeleteDonatorModal(!isOpenDeleteDonatorModal);
  return (
    <>
      <table className="table table-info">
        <thead>
          <tr className="table-active">
            <th scope="row">Doação</th>
            <td>{props.donation.title}</td>
            <td className="text-center">
              <button className="btn btn-sm btn-danger" onClick={openDeleteDonationModal}><MdDelete /></button>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Doador</th>
            {props.donation.donator ? (
              <>
                <td>{props.donation.donator}</td>
                <td className="text-center">
                  <button className="btn btn-sm btn-danger" onClick={openDeleteDonatorModal}><MdDelete /></button>
                </td>
              </>
            ) : (
              <>
                <td className="text-muted">Nenhum</td>
                <td className="text-center"><button className="btn btn-sm btn-danger opacity-50"><MdDelete /></button></td>
              </>
            )}
          </tr>
        </tbody>
      </table>
      {isOpenDeleteDonationModal && (
        <DeleteDonation handleModal={openDeleteDonationModal} donationId={props.donation._id} donationTitle={props.donation.title} />
      )}
      {isOpenDeleteDonatorModal && props.donation.donator && (
        <DeleteDonator handleModal={openDeleteDonatorModal} donationId={props.donation._id} donator={props.donation.donator} />
      )}
    </>
  )
};