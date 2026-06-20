import {
  useEffect,
  useState,
} from "react";

import ProfitRecordsTable
  from "../../components/investor/ProfitRecordsTable";

import {
  investorPortalService,
} from "../../services/investorPortalService";

const ProfitRecords = () => {
  const [records, setRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords =
    async () => {
      try {
        const response =
          await investorPortalService
            .getProfitRecords();

        setRecords(
          response.data.data || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="p-6">
        Loading profit records...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Profit Records
      </h1>

      <ProfitRecordsTable
        records={records}
      />
    </div>
  );
};

export default ProfitRecords;