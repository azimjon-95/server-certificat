const router = require("express").Router();
const Dip = require("../models/diplomModul");


// Create a new certificate
router.post("/", async (req, res) => {
  try {
    const existCertificate = await Dip.find({ id: req.body.id, name: req.body.name, surname: req.body.surname });
    if (existCertificate.length > 0) {
      return res.status(409).json({ message: "Certificate already exists" });
    }

    const newCertificate = new Dip({
      id: req.body.id,
      name: req.body.name,
      surname: req.body.surname,
      teachername: req.body.teachername,
      courseName: req.body.courseName,
      givenDate: req.body.givenDate,
      catigory: req.body.catigory,
      prosent: req.body.prosent,
    });
    const certificate = await newCertificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    res.status(500).json({ message: "Error creating certificate", error: err.message });
  }
});

// Check certificate by ID
router.get("/check/:id", async (req, res) => {
  const params = req.params.id.toUpperCase();
  try {
    const validCertificate = await Dip.findOne({ id: params });
    if (!validCertificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json(validCertificate);
  } catch (err) {
    res.status(500).json({ message: "Error fetching certificate", error: err.message });
  }
});

// Get all certificates
router.get("/all", async (req, res) => {
  try {
    const allCertificates = await Dip.find({});
    res.status(200).json(allCertificates);
  } catch (err) {
    res.status(500).json({ message: "Error fetching certificates", error: err.message });
  }
});

// Soft delete a certificate by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const removedCert = await Dip.findByIdAndDelete(id, { deleted: true });

    if (!removedCert) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.status(200).json({ message: "Certificate soft-deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting certificate", error: error.message });
  }
});

// Search certificates
router.get("/search", async (req, res) => {
  try {
    const { id, name, surname, teachername, courseName } = req.query;
    const query = {};

    if (id) query.id = id;
    if (name) query.name = new RegExp(name, 'i'); // case-insensitive search
    if (surname) query.surname = new RegExp(surname, 'i');
    if (teachername) query.teachername = new RegExp(teachername, 'i');
    if (courseName) query.courseName = courseName;

    const certificates = await Dip.find(query);
    res.status(200).json(certificates);
  } catch (err) {
    res.status(500).json({ message: "Error searching certificates", error: err.message });
  }
});


module.exports = router;
