import { useEffect, useState } from 'react';

import { Form, Formik } from 'formik';
import * as _ from 'lodash';

import { Button, Grid, Group, Image, Modal, Text, Title, useMantineTheme } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import houzzBeer from '../../assets/houzz-beer.png';
import ActionBar from '../../components/Actionbar';
import InputField from '../../components/common/InputField';
import NoDataMessage from '../../components/common/NoDataMessage';
import TextAreaField from '../../components/common/TextAreaField';
import MyBeerItem from '../../components/MyBeerItem';
import { BeerSkeleton } from '../../components/skeleton';
import { useBeerView } from '../../hooks/useBeerView';
import { useColors } from '../../hooks/useColors';
import { BeerFormValueProps } from '../../types/beer-form';
import { addBeerSchema } from '../../utils/formValidation/addBeerValidation';

const dataKey = 'myBeerData';

const initialFormData: BeerFormValueProps = {
  id: null,
  name: '',
  genre: '',
  description: '',
  image: houzzBeer,
};

const MyBeer = () => {
  const theme = useMantineTheme();
  const { view, onViewChange } = useBeerView('list');
  const { isDark } = useColors();

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [myBeerData, setMyBeerData] = useState<BeerFormValueProps[]>([]);
  const [formData, setFormData] = useState<BeerFormValueProps>({ ...initialFormData });
  const [rowId, setRowId] = useState<string | null>(null);

  useEffect(() => {
    const cachedData = localStorage.getItem(dataKey);

    if (cachedData !== null) {
      setMyBeerData(JSON.parse(cachedData));
      setIsLoading(false);
    }
  }, []);

  const handleFormModal = () => {
    setFormModal(true);
  };

  const handleFormClose = () => {
    setFormModal(false);
    setFormData({ ...initialFormData });
  };

  const handleDeleteModal = (id: string) => {
    setDeleteModal(true);
    setRowId(id);
  };

  const handleRemoveBeer = (id: string) => {
    setIsDeleting(true);

    setTimeout(() => {
      const updatedBeer = myBeerData.filter((beer: BeerFormValueProps) => beer.id !== id);
      setMyBeerData(updatedBeer);
      localStorage.setItem(dataKey, JSON.stringify(updatedBeer));
      setIsDeleting(false);
      setDeleteModal(false);
    }, 500);
  };

  return (
    <>
      <ActionBar title="My Beers" onViewChange={onViewChange} view={view}>
        <Button color="indigo" mr={4} size="xs" leftIcon={<IconPlus size={18} />} onClick={handleFormModal} styles={{ leftIcon: { marginRight: 8 } }}>
          Add Beer
        </Button>
      </ActionBar>

      <Grid>
        {isLoading && <BeerSkeleton view={view} />}
        {myBeerData.length < 1 ? <NoDataMessage /> : <MyBeerItem data={myBeerData} view={view} handleRemoveBeer={handleDeleteModal} />}
      </Grid>

      <Formik
        initialValues={formData}
        validationSchema={addBeerSchema}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);

          setTimeout(() => {
            const data: BeerFormValueProps = {
              ...values,
              id: _.uniqueId('hb_'),
            };

            const existingDataString = localStorage.getItem(dataKey);
            const existingDataValues = existingDataString ? JSON.parse(existingDataString) : [];

            setMyBeerData([...existingDataValues, data]);
            localStorage.setItem(dataKey, JSON.stringify([...existingDataValues, data]));

            actions.resetForm();
            actions.setSubmitting(false);
            handleFormClose();
          }, 500);
        }}>
        {({ errors, touched, handleReset, values, isSubmitting }) => (
          <Modal
            opened={formModal}
            onClose={() => {
              handleReset();
              handleFormClose();
            }}
            title={
              <Title order={5} sx={{ fontWeight: 500 }}>
                Add Beer
              </Title>
            }
            overlayBlur={3}
            overlayOpacity={0.55}
            overlayColor={isDark ? theme.colors.dark[5] : theme.colors.gray[5]}
            closeOnClickOutside={false}
            centered>
            <Form>
              <Image
                src={values.image}
                width={110}
                height={110}
                fit="contain"
                mb={15}
                styles={{
                  figure: { border: `1px solid ${isDark ? theme.colors.dark['4'] : theme.colors.gray['4']}`, borderRadius: theme.radius.md },
                }}
              />

              <InputField name="name" error={errors.name} touch={touched.name} labelName="Beer Name" placeHolder="Enter beer name" withAsterisk />

              <InputField name="genre" error={errors.genre} touch={touched.genre} labelName="Genre" placeHolder="Enter genre" withAsterisk />

              <TextAreaField
                name="description"
                error={errors.description}
                touch={touched.description}
                labelName="Description"
                placeHolder="Write the description..."
                withAsterisk
              />

              <Group position="right" mt={20}>
                <Button variant="default" px={15} onClick={() => setFormModal(false)} sx={{ fontWeight: 500 }}>
                  Cancel
                </Button>
                <Button type="submit" px={15} color="indigo" mr={4} loading={isSubmitting}>
                  Add Bear
                </Button>
              </Group>
            </Form>
          </Modal>
        )}
      </Formik>

      <Modal
        opened={deleteModal}
        onClose={() => setDeleteModal(false)}
        title={
          <Title order={5} sx={{ fontWeight: 500 }}>
            Are you sure?
          </Title>
        }
        overlayBlur={3}
        overlayOpacity={0.55}
        overlayColor={isDark ? theme.colors.dark[5] : theme.colors.gray[5]}
        closeOnClickOutside={false}
        centered>
        <Text>Do you really want to delete this?</Text>
        <Group position="right" mt={20}>
          <Button variant="default" px={15} onClick={() => setDeleteModal(false)} sx={{ fontWeight: 500 }} disabled={isDeleting}>
            Cancel
          </Button>
          <Button color="red" px={15} loading={isDeleting} onClick={() => handleRemoveBeer(String(rowId))} sx={{ fontWeight: 500 }}>
            Yes! Delete it
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default MyBeer;
