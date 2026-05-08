import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import GenderButton from '@/src/components/Button/GenderButton';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import Checkbox from '@/src/components/Icon/Checkbox';
import Close from '@/src/components/Icon/Close';
import { SelectField } from '@/src/components/Input/SelectField';
import { TextField } from '@/src/components/Input/TextField';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

type Gender = '남성' | '여성' | '선택 안함';

const STATUS_OPTIONS = [
  '대학생이에요',
  '직장인이에요',
  '취업/진로를 준비 중이에요',
  '프리랜서/자유롭게 일하고 있어요',
  '기타',
];

export default function OnboardingStep1() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [birthDate, setBirthDate] = useState('');
  const [status, setStatus] = useState('');
  const [serviceAgree, setServiceAgree] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(false);

  const allAgree = serviceAgree && marketingAgree;

  const toggleAll = () => {
    const next = !allAgree;
    setServiceAgree(next);
    setMarketingAgree(next);
  };

  const handleBirthdayChange = (text: string) => {
    setBirthDate(text.replace(/\D/g, ''));
  };

  const isValidDate = (value: string): boolean => {
    const yy = parseInt(value.slice(0, 2), 10);
    const mm = parseInt(value.slice(2, 4), 10);
    const dd = parseInt(value.slice(4, 6), 10);
    if (mm < 1 || mm > 12) return false;
    const currentYY = new Date().getFullYear() % 100;
    const fullYear = yy <= currentYY ? 2000 + yy : 1900 + yy;
    const date = new Date(fullYear, mm - 1, dd);
    return date.getMonth() === mm - 1 && date.getDate() === dd;
  };

  const nicknameHasInvalidChars = nickname.length > 0 && !/^[가-힣a-zA-Z0-9]+$/.test(nickname);
  const isNicknameValid = nickname.length >= 2 && !nicknameHasInvalidChars;
  const isBirthdayValid = birthDate.length === 6 && isValidDate(birthDate);

  const nicknameError = nicknameHasInvalidChars
    ? '한글, 영문, 숫자만 사용할 수 있어요.'
    : nickname.length > 0 && nickname.length < 2
      ? '2자 이상 입력해주세요.'
      : undefined;
  const birthdayError =
    birthDate.length === 6 && !isValidDate(birthDate) ? '존재하지 않는 날짜예요.' : undefined;

  const isFormValid = isNicknameValid && isBirthdayValid && serviceAgree;

  return (
    <ScreenLayout withKeyboard style={styles.container}>
      <View style={styles.header}>
        <Typography size="xl" weight="bold" style={styles.headerTitle}>
          프로필을 만들어 주세요
        </Typography>
        <Close onPress={() => router.back()} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <View style={styles.section}>
            <Typography size="lg" style={styles.label}>
              닉네임을 입력해주세요.
            </Typography>
            <TextField
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onChangeText={setNickname}
              helperText="영문, 한글, 숫자를 사용한 2자 - 10자로 입력해주세요."
              errorMessage={nicknameError}
              maxLength={10}
            />
          </View>

          <View style={styles.section}>
            <Typography size="lg" style={styles.label}>
              성별
            </Typography>
            <View style={styles.genderRow}>
              {(['남성', '여성', '선택 안함'] as Gender[]).map((g) => (
                <GenderButton
                  key={g}
                  label={g}
                  selected={gender === g}
                  onPress={() => setGender(g)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Typography size="lg" style={styles.label}>
              생년월일
            </Typography>
            <TextField
              placeholder="예: 010101"
              value={birthDate}
              onChangeText={handleBirthdayChange}
              keyboardType="numeric"
              maxLength={6}
              errorMessage={birthdayError}
            />
          </View>

          <View style={styles.section}>
            <Typography size="lg" style={styles.label}>
              현재 어떤 상태이신가요?
            </Typography>
            <SelectField
              options={STATUS_OPTIONS}
              value={status || undefined}
              placeholder="대학생이에요"
              onChange={setStatus}
            />
          </View>
        </View>

        <View style={styles.agreeBox}>
          <View style={styles.agreeTopSection}>
            <TouchableOpacity style={styles.agreeRow} onPress={toggleAll} activeOpacity={0.7}>
              <Checkbox checked={allAgree} readOnly />
              <Typography size="lg" style={styles.agreeAllText}>
                전체 동의
              </Typography>
            </TouchableOpacity>
            <View style={styles.agreeDivider} />
          </View>

          <View style={styles.agreeSubItems}>
            <TouchableOpacity
              style={styles.agreeRow}
              onPress={() => setServiceAgree((v) => !v)}
              activeOpacity={0.7}
            >
              <Checkbox checked={serviceAgree} readOnly />
              <Text style={styles.agreeItemText}>
                <Text style={styles.agreeUnderline}>서비스 이용약관</Text>
                <Text> 및 </Text>
                <Text style={styles.agreeUnderline}>개인정보 취급 방침</Text>
                <Text> 동의</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.agreeRow}
              onPress={() => setMarketingAgree((v) => !v)}
              activeOpacity={0.7}
            >
              <Checkbox checked={marketingAgree} readOnly />
              <Typography size="sm" style={styles.agreeItemText}>
                마케팅 정보 수신 동의 (선택)
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="다음"
          onPress={() => router.push('/onboarding/step2')}
          variant="primary"
          disabled={!isFormValid}
        />
      </CTAContainer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 136,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
    backgroundColor: colors.neutral.white,
  },
  headerTitle: {
    color: colors.text.primary,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 63,
    paddingBottom: 16,
    gap: 90,
    alignItems: 'center',
  },
  formContainer: {
    width: 335.5,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 36,
  },
  section: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 9,
    alignSelf: 'stretch',
  },
  label: {
    color: colors.text.primary,
    lineHeight: 24,
  },
  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 19,
    alignSelf: 'stretch',
  },
  agreeBox: {
    width: 335,
    paddingTop: 33,
    paddingBottom: 33,
    paddingLeft: 17,
    paddingRight: 48,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  agreeTopSection: {
    width: 255,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 27,
  },
  agreeDivider: {
    width: 255,
    height: 2,
    backgroundColor: '#EAEAEA',
  },
  agreeSubItems: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 9,
    alignSelf: 'stretch',
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  agreeAllText: {
    color: colors.text.primary,
    lineHeight: 24,
  },
  agreeItemText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.text.primary,
  },
  agreeUnderline: {
    textDecorationLine: 'underline',
  },
  cta: {
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
