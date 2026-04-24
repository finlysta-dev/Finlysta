"use client";

import { useEffect, useState } from "react";

type Stat = {
  id: string;
  label: string;
  value: string;
  icon?: string;
  order: number;
  isActive: boolean;
};

export default function AdminStats() {

  const [stats, setStats] = useState<Stat[]>([]);
  const [editing, setEditing] = useState<string | null>(null);

  const [newStat, setNewStat] = useState({
    label: "",
    value: "",
    icon: "users",
    order: 0
  });

  // ✅ SAFE LOAD FUNCTION (FIXED)
  async function loadStats() {
    try {
      const res = await fetch("/api/admin/stats");

      const text = await res.text(); // ✅ important fix
      const data = text ? JSON.parse(text) : {};

      // ✅ handle your API shape
      setStats(data.data || []);

    } catch (err) {
      console.error("Load stats error:", err);
      setStats([]);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);


  /* ADD STAT */

  async function createStat(e: any) {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newStat)
      });

      // ✅ prevent crash
      await res.text();

      setNewStat({
        label: "",
        value: "",
        icon: "users",
        order: 0
      });

      loadStats();

    } catch (err) {
      console.error("Create stat error:", err);
    }
  }


  /* DELETE */

  async function deleteStat(id: string) {

    if (!confirm("Delete stat?")) return;

    try {
      await fetch(`/api/admin/stats/${id}`, {
        method: "DELETE"
      });

      loadStats();

    } catch (err) {
      console.error("Delete error:", err);
    }

  }


  /* UPDATE */

  async function updateStat(stat: Stat) {

    try {
      await fetch(`/api/admin/stats/${stat.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(stat)
      });

      setEditing(null);
      loadStats();

    } catch (err) {
      console.error("Update error:", err);
    }

  }


  /* FIELD CHANGE */

  function changeField(id: string, field: string, value: any) {

    setStats(prev =>
      prev.map(stat =>
        stat.id === id
          ? { ...stat, [field]: value }
          : stat
      )
    );

  }


  return (

    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Manage Platform Stats
      </h1>


      {/* ADD STAT */}

      <div className="bg-white border rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Add New Stat
        </h2>

        <form
          onSubmit={createStat}
          className="grid md:grid-cols-5 gap-4"
        >

          <input
            placeholder="Label"
            value={newStat.label}
            onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            placeholder="Value"
            value={newStat.value}
            onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            placeholder="Icon"
            value={newStat.icon}
            onChange={(e) => setNewStat({ ...newStat, icon: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Order"
            value={newStat.order}
            onChange={(e) => setNewStat({ ...newStat, order: Number(e.target.value) })}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Add Stat
          </button>

        </form>

      </div>


      {/* STATS TABLE */}

      <div className="bg-white border rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 text-left">Label</th>
              <th className="p-3 text-left">Value</th>
              <th className="p-3 text-left">Icon</th>
              <th className="p-3 text-left">Active</th>
              <th className="p-3 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {stats.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  No stats found
                </td>
              </tr>
            )}

            {stats.map(stat => (

              <tr key={stat.id} className="border-t">

                <td className="p-3">
                  {editing === stat.id ? (
                    <input
                      value={stat.label}
                      onChange={(e) => changeField(stat.id, "label", e.target.value)}
                      className="border p-1 rounded"
                    />
                  ) : stat.label}
                </td>

                <td className="p-3">
                  {editing === stat.id ? (
                    <input
                      value={stat.value}
                      onChange={(e) => changeField(stat.id, "value", e.target.value)}
                      className="border p-1 rounded"
                    />
                  ) : stat.value}
                </td>

                <td className="p-3">
                  {editing === stat.id ? (
                    <input
                      value={stat.icon}
                      onChange={(e) => changeField(stat.id, "icon", e.target.value)}
                      className="border p-1 rounded"
                    />
                  ) : stat.icon}
                </td>

                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={stat.isActive}
                    onChange={(e) => changeField(stat.id, "isActive", e.target.checked)}
                  />
                </td>

                <td className="p-3 space-x-3">

                  {editing === stat.id ? (
                    <button
                      onClick={() => updateStat(stat)}
                      className="text-green-600 text-sm"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditing(stat.id)}
                      className="text-blue-600 text-sm"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteStat(stat.id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
