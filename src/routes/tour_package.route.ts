import express, { Router } from 'express';

const tourPackageRouter: Router = express.Router();

// add tourPackage
tourPackageRouter.post('/');

// update tourPackage
tourPackageRouter.put('/:id');

// delete tourPackage
tourPackageRouter.delete('/:id');

// get all tourPackages
tourPackageRouter.get('/');

// get a tourPackage
tourPackageRouter.get('/:id');

export default tourPackageRouter;
