const stores = [
  {
    _id: "64a9f0c0d0c9e1a1b2c3d4e1",
    name: "Classic Cut Studio",
    location: "Mumbai",
    image: "https://picsum.photos/seed/barber1/600/400"
  },
  {
    _id: "64a9f0c0d0c9e1a1b2c3d4e2",
    name: "Urban Edge Salon",
    location: "Mumbai",
    image: "https://picsum.photos/seed/barber2/600/400"
  },
  {
    _id: "64a9f0c0d0c9e1a1b2c3d4e3",
    name: "Royal Blades",
    location: "Mumbai",
    image: "https://picsum.photos/seed/barber3/600/400"
  },
  {
    _id: "64a9f0c0d0c9e1a1b2c3d4e4",
    name: "The Trim House",
    location: "Mumbai",
    image: "https://picsum.photos/seed/barber4/600/400"
  }
];

const services = [
  {
    _id: "srv1",
    storeId: "64a9f0c0d0c9e1a1b2c3d4e1",
    name: "Haircut",
    price: 150,
    duration: "30 mins"
  },
  {
    _id: "srv2",
    storeId: "64a9f0c0d0c9e1a1b2c3d4e1",
    name: "Beard Trim",
    price: 100,
    duration: "20 mins"
  },
  {
    _id: "srv3",
    storeId: "64a9f0c0d0c9e1a1b2c3d4e2",
    name: "Haircut",
    price: 180,
    duration: "30 mins"
  },
  {
    _id: "srv4",
    storeId: "64a9f0c0d0c9e1a1b2c3d4e2",
    name: "Haircut + Beard",
    price: 250,
    duration: "45 mins"
  },
  {
    _id: "srv5",
    storeId: "64a9f0c0d0c9e1a1b2c3d4e3",
    name: "Premium Haircut",
    price: 220,
    duration: "40 mins"
  }
];

// ---------------- CONTROLLERS ----------------

// GET /api/stores/:storeId
export const getStoreById = (req, res) => {
  const { storeId } = req.params;

  const store = stores.find(store => store._id === storeId);

  if (!store) {
    return res.status(404).json({ message: "Store not found" });
  }

  res.status(200).json(store);
};

// GET /api/stores/:storeId/services
export const getServicesByStore = (req, res) => {
  const { storeId } = req.params;

  const storeServices = services.filter(
    service => service.storeId === storeId
  );

  if (!storeServices.length) {
    return res
      .status(404)
      .json({ message: "No services found for this store" });
  }

  res.status(200).json(storeServices);
};


