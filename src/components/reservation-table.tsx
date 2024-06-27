import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReservationsDatabaseColumn } from "@/lib/types";

export default function ReservationsTable({
  reservations,
  future,
}: {
  reservations: ReservationsDatabaseColumn[];
  future?: boolean;
}) {
  return (
    <Table className="rounded">
      <TableCaption>A list of your future shedule.</TableCaption>
      <TableHeader>
        <TableRow className="text-bold bg-gray-500/40">
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>Service</TableHead>
          <TableHead className="">Date time</TableHead>
          <TableHead className="text-right">Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((r, idx) => {
          if (future === undefined)
            return (
              <TableRow key={idx}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.phonenumber}</TableCell>
                <TableCell>{r.service}</TableCell>
                <TableCell>
                  {new Date(r.datetime).toLocaleDateString()}
                  {"   "}
                  {new Date(r.datetime).toLocaleTimeString()}
                </TableCell>
                <TableCell className="text-right">1 hour</TableCell>
              </TableRow>
            );

          if (future) {
            const now = new Date();
            const reservationDate = new Date(r.datetime);
            if (reservationDate > now) {
              return (
                <TableRow key={idx}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.phonenumber}</TableCell>
                  <TableCell>{r.service}</TableCell>
                  <TableCell>
                    {new Date(r.datetime).toLocaleDateString()}
                    {"   "}
                    {new Date(r.datetime).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="text-right">1 hour</TableCell>
                </TableRow>
              );
            }
          } else {
            const now = new Date();
            const reservationDate = new Date(r.datetime);
            if (reservationDate < now) {
              return (
                <TableRow key={idx}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.phonenumber}</TableCell>
                  <TableCell>{r.service}</TableCell>
                  <TableCell>
                    {new Date(r.datetime).toLocaleDateString()}
                    {"   "}
                    {new Date(r.datetime).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="text-right">1 hour</TableCell>
                </TableRow>
              );
            }
          }
        })}
      </TableBody>
    </Table>
  );
}
