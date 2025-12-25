"use client";
import { useEffect, useState } from "react";

export default function SeoAdmin() {
  const [seo, setSeo] = useState({});

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((r) => r.json())
      .then((d) => setSeo(d.data));
  }, []);

  const save = async () => {
    await fetch("/api/admin/seo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seo),
    });
    alert("SEO updated");
  };

  return (
    <div className="container">
      <h3>SEO Settings</h3>

      <input
        value={seo.meta_title || ""}
        onChange={(e) => setSeo({ ...seo, meta_title: e.target.value })}
        placeholder="Meta Title"
      />

      <textarea
        value={seo.meta_description || ""}
        onChange={(e) => setSeo({ ...seo, meta_description: e.target.value })}
        placeholder="Meta Description"
      />

      <textarea
        value={seo.meta_keywords || ""}
        onChange={(e) => setSeo({ ...seo, meta_keywords: e.target.value })}
        placeholder="Keywords"
      />

      <button onClick={save}>Save SEO</button>
    </div>
  );
}
